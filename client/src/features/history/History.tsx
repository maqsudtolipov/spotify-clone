import HistoryTabs from './HistoryTabs.tsx';
import HistoryList from './HistoryList.tsx';

interface HistoryProps {
  handleNewColor: () => void;
}

const History = ({ handleNewColor }: HistoryProps) => {
  return (
    <div>
      <HistoryTabs />
      <HistoryList handleNewColor={handleNewColor} />
    </div>
  );
};

export default History;
