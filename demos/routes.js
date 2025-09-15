import BasicInit from './cases/BasicInit.jsx';
import MarkdownInit from './cases/MarkdownInit.jsx';
import Events from './cases/Events.jsx';
import Locale from './cases/Locale.jsx';
import BackendUrl from './cases/BackendUrl.jsx';
import CustomBackend from './cases/CustomBackend.jsx';
import BackendResolve from './cases/BackendResolve.jsx';

export const links = [
  ['/base/:skin', 'Comments basic', BasicInit, 'BasicInit'],
  ['/markdown/:skin', 'Markdown content', MarkdownInit, 'MarkdownInit'],
  ['/events/:skin', 'Events', Events, 'Events'],
  ['/locale/:skin', 'Locales', Locale, 'Locale'],
  ['/backend-url/:skin', 'Save to backend', BackendUrl, 'BackendUrl'],
  ['/backend-custom/:skin', 'Custom backend', CustomBackend, 'CustomBackend'],
  [
    '/data-resolve/:skin',
    'Resolve and fetch',
    BackendResolve,
    'BackendResolve',
  ],
];
