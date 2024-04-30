from lyrics import *    
from flask_cors import CORS
from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app, resources={
    r"/*":{
        "origins":[
            "http://localhost:5173/", "http://localhost:5173/Karaoke" # might need to change this 
        ], "support_credentials": True
    }
})

@app.route('/lyrics', methods=['POST'])
def test():
    data = request.get_json()
    if not data or 'query' not in data:
        print("No search query provided")
        return jsonify({'error': 'Search query is required'}), 400
    search_query = data.get('query')
    array = search_query.split(";")
    song_title = array[0].strip()  # "Young and Beautiful"
    artist_name = array[1].strip()
    lyrics = song_lyrics(song_title, artist_name)

    try:
        response_data = {'status': 'success', 'data': lyrics}
        print("Returning response:", response_data)  # Print the response data
        
        return jsonify(response_data), 200
        
    except Exception as e:
        app.logger.error("Error occurred: ", str(e))  # Log the error
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(port=5000, debug=True) 

# lyrics needs artist name and amount of songs
# song_lyrics needs song title and artist name


