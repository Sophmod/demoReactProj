import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const API_URL = 'https://hn.algolia.com/api/v1/search?query=';
const PAGE_QUERY = '&page=';
const PAGE_HPP = '&hitsPerPage=';

const defaultPage = 0;
const defaultSearch = 'redux';
const defaultHPP = '40';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      result: null,
      searchKey: '',
      searchTerm: defaultSearch,
      isLoading: false
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this); 
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm, defaultPage);
    }
    
    event.preventDefault(); //Prevents page reloading from form's submit callback
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      results: { 
        ...results,
        [searchKey]: { hits: updatedHits, page}
      },
      isLoading: true
    });
  }

  fetchSearchTopStories(searchTerm, page) {
    this.setState({ isLoading: true });

    fetch(API_URL + searchTerm + PAGE_QUERY + page + PAGE_HPP + defaultHPP)
     .then(response => response.json())
     .then(result => this.setSearchTopStories(result));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm, defaultPage);
  }

  onDismiss(id) { 
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id; 
    const updatedHits = hits.filter(isNotId);  

    this.setState({ 
      results: { 
        ...results, 
        [searchKey]: { hits: updatedHits, page}
      }
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, results, searchKey, isLoading } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0; 
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    return ( 
      <div className="App">
        <Search 
        value={searchTerm}
        onChange={this.onSearchChange}
        onSubmit={this.onSearchSubmit}
        >
          Search:
        </Search>
        { results ? 
        <Table 
        list={list}
        onDismiss={this.onDismiss}
        />
        : null}
        <div>
          { isLoading ? <Loading />
          : <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
          </Button>
          }
        </div>
      </div>
    );
  }
}

class Search extends Component {

  componentDidMount() {
    this.input.focus();
  }

  render() {
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props;

    return (
      <form className="my-form" onSubmit={onSubmit}>
        <input
        type="text"
        value={value}
        onChange={onChange}
        ref={(node) => { this.input = node; }}
        />
        <button type="submit">
          {children}
        </button>
      </form>
    )
  }
}

const Table = ({list, onDismiss}) => {
  return (
    <div className="list-container">
      {list.map(item => 
      <div key={item.objectID} className="list-display">
        <div>
          <a href={item.url}>{item.title}</a>
        </div>
        <div>{item.author}</div>
        <div>{item.num_comments} comments</div>
        <div>{item.points} points</div>
        <div>
          <Button 
          onClick={() => onDismiss(item.objectID)}>
          Dismiss
          </Button>
        </div>
      </div>
      )}
    </div>
  );
}

const Button = ({onClick, className = '', children}) => 
  <button 
  onClick={onClick}
  className={className}
  type="button"
  >
   {children}
  </button>

  Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  };


const Loading = () => 
  <div>Loading...</div>

export default App;