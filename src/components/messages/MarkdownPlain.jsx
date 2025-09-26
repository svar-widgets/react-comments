import { html } from '../../libs/lima.es.js';

export default function MarkdownPlain({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: html(content) }} />;
}
