import faker from 'faker';
import words from 'lodash/words';

import {
  defaultImg,
  imageRoot,
  getImageUrl,
  getExcerpt,
} from '.';

const example = '/example.jpg';
const fullUrl = `${imageRoot}${example}`;

const description = faker.lorem.paragraphs();

test('getImageUrl returns correct URL', () => {
  expect(getImageUrl()).toEqual(defaultImg);
  expect(getImageUrl(example)).toEqual(fullUrl);
});

test('getExcerpt returns correct excerpt', () => {
  expect(words(getExcerpt(description, 50)).length).toBeLessThanOrEqual(50);
});
