import HistoryTabs from './HistoryTabs.tsx';
import { useEffect, useReducer } from 'react';
import { faker } from '@faker-js/faker';
import HistoryList from './HistoryList.tsx';

export interface HistoryItem {
  img: string;
  name: string;
  type: ('artist' | 'playlist' | 'song')[];
}

interface ReducerState {
  filter: 'all' | 'song' | 'playlist' | 'artist';
  items: [];
  filteredItems: [];
}

interface ReducerActions {
  type: 'initialize' | 'changeFilter';
  payload?: any;
}

const initialValue: ReducerState = {
  filter: 'all',
  items: [],
  filteredItems: [],
};

const reducer = (state: ReducerState, action: ReducerActions) => {
  if (action.type === 'initialize') {
    return { ...state, items: action.payload, filteredItems: action.payload };
  } else if (action.type === 'changeFilter') {
    if (action.payload === 'all') {
      return { ...state, filteredItems: state.items };
    } else {
      const items = state.items.filter(
        (el: HistoryItem) => el.type === action.payload,
      );
      return { ...state, filteredItems: items };
    }
  }

  return state;
};

interface HistoryProps {
  handleNewColor: () => void;
}

const History = ({ handleNewColor }: HistoryProps) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  // Fetch history cards
  useEffect(() => {
    const fetchedItems = Array.from({ length: 8 }, () => ({
      img: faker.image.url({ height: 120, width: 120 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      type: faker.helpers.arrayElement(['artist', 'playlist', 'song']),
    }));

    dispatch({ type: 'initialize', payload: fetchedItems });
  }, []);

  const handleChangeFilter = (filter: string) => {
    dispatch({ type: 'changeFilter', payload: filter });
  };

  return (
    <div style={{ containerType: 'inline-size' }}>
      <HistoryTabs
        selectedFilter={state.filter}
        handleChangeFilter={handleChangeFilter}
      />
      {state.filteredItems && (
        <HistoryList
          items={state.filteredItems}
          handleNewColor={handleNewColor}
        />
      )}
    </div>
  );
};

export default History;
