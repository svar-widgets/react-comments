export default function Message({ owned, author, date, children }) {
  return (
    <div
      className={owned == author.id ? 'owned' : ''}
      style={{ paddingLeft: '8px' }}
    >
      <b>{author.name}</b> |
      <span className="date">{date.toLocaleString()}</span>
      {children}
    </div>
  );
}
