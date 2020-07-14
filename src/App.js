import React from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const initialStories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  function getAsyncStories() {
    return(new Promise(function(resolve) {
      console.log('set time out starts');
      setTimeout(() => resolve({ data: { stories: initialStories } }), 5000 );
        //resolve({ data: { stories: initialStories } });
    }));
  }
   
  
  console.log("aamiR>>..");

  const [searchTerm, setSearchTerm] = React.useState(localStorage.getItem('search') || 'React');
  const [stories, setStories] = React.useState([]);

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

 React.useEffect(() => {
    getAsyncStories().then(function(result) {
      setStories(result.data.stories);
    });
  }, []);
  
  const handleSearch = event => {
    console.log("handle...");
    setSearchTerm(event.target.value);
    //localStorage.setItem('search', event.target.value);
  };

  const searchedStories = stories.filter(story => {
    return story.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());
  });

  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    );
    setStories(newStories);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel id="search" value={searchTerm} onInputChange={handleSearch} >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    </div>
  );
}

const List = ({ list, onRemoveItem }) =>
  list.map(item => <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />);

const Item = ({ item, onRemoveItem }) => {
  return(
    <div>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>Dismiss</button>
      </span>
    </div>
  )
};  

const InputWithLabel = ({ id, value, type = 'text', onInputChange, children }) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input id={id} type={type} value={value} onChange={onInputChange} />
  </>
);

export default App;
