const GIPHY_API_URL = 'https://api.giphy.com';
const GIPHY_PUB_KEY = 'W8M6AZTGBkORJeKHnUYjs3iG4UW7w3X4';
const prefix = "https://cors-anywhere.herokuapp.com/";
const urlConst = prefix + GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=';

App = React.createClass({

    getInitialState: function() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(urlConst + searchingText)
            .then((resp) => {
                this.setState({
                    loading: false,
                    gif: resp,
                    searchingText,
                });
            })
            .catch(error => console.log(error));
    },

    getGif: function(url) {
        return new Promise(
            function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onload = function() {
                    if (this.status === 200) {
                        var data = JSON.parse(xhr.responseText).data;
                        resolve(data);
                    } else {
                        reject(new Error(this.statusText));
                    }
                };
                xhr.onerror = function() {
                    reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
                };                 
                xhr.open('GET', url);
                xhr.send();
            }
        );
    },

    render: function() {
        var styles = {
            height: '100vh',
            width: '90%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        };

        return (
            <div style={styles}>
                <h1>GIF search engine</h1>
                <p>Search gif from <a href='http://giphy.com'>giphy</a>. Click enter to load.</p>
                <Search 
                    onSearch={this.handleSearch}
                />
                <Gif 
                    loading={this.state.loading}
                    url={this.state.gif.image_url}
                    sourceUrl={this.state.gif.sourceUrl}
                / >
            </div>
        );
    }
});