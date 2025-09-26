const customFormat = (text) => {
  // Convert @mentions: @[Name](user:id) -> <a href="/users/id">Name</a>
  return text.replace(
    /@\[(.*?)\]\(user:(\d+)\)/g,
    '<a href="/users/$2">$1</a>',
  );
};

export default function Content({ content }) {
  return (
    <div
      className="text"
      dangerouslySetInnerHTML={{ __html: customFormat(content) }}
    />
  );
}
