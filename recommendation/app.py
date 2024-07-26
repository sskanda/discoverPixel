from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the models and data
model = pickle.load(open('artifacts/model.pkl', 'rb'))
place_names = pickle.load(open('artifacts/place_names.pkl', 'rb'))
ratings_with_places = pickle.load(open('artifacts/ratings_with_places.pkl', 'rb'))
places_pivot = pickle.load(open('artifacts/places_pivot.pkl', 'rb'))

def fetch_poster(suggestion):
    place_name = []
    ids_index = []
    poster_url = []

    for place_id in suggestion:
        place_name.append(places_pivot.index[place_id])

    for name in place_name[0]: 
        ids = np.where(ratings_with_places['PlaceName'] == name)[0][0]
        ids_index.append(ids)

    for idx in ids_index:
        url = ratings_with_places.iloc[idx]['ImageURL']
        poster_url.append(url)

    return poster_url

def recommend_book(place_name):
    places_list = []
    place_id = np.where(places_pivot.index == place_name)[0][0]
    distance, suggestion = model.kneighbors(places_pivot.iloc[place_id,:].values.reshape(1,-1), n_neighbors=6 )

    poster_url = fetch_poster(suggestion)
    
    for i in range(len(suggestion)):
            places = places_pivot.index[suggestion[i]]
            for j in places:
                places_list.append(j)
    return places_list, poster_url

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    place_name = data['place_name']
    recommended_places, poster_url = recommend_book(place_name)
    response = {
        'recommended_books': recommended_places[1:],  # Skip the first one as it's the queried book itself
        'poster_url': poster_url[1:]  # Skip the first one as it's the queried book itself
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
