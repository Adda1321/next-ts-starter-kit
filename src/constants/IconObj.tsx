import SvgColor from './SvgIcon';

const icon = (name: any) => (
  <SvgColor src={`/images/${name}.svg`} sx={{width: 1, height: 1}} />
);

export const ICONS = {
  bookcase: icon('book'),
  addBookcase: icon('add'),
  bookmark: icon('bookmark'),
  settings: icon('settings'),
  person: icon('person'),
  actions: icon('actions'),
};
