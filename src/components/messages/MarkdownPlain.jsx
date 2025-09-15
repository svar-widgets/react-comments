import { html } from "../../libs/lima.es.js";

export default function MarkdownPlain({ text }) {
  return <div dangerouslySetInnerHTML={{ __html: html(text) }} />;
}