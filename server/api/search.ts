export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { query, type, gender } = body;

  const results = await searchProducts(query, type, gender);

  return { results };
});

const formatGender = (gender: string): string => {
  const genders: { [key: string]: string } = {
    Men: 'men',
    Women: 'ladies',
  };
  return genders[gender] || '';
};

const formatType = (gender: string, type: string): string => {
  const types: { [key: string]: string } = {
    Shirts: gender === 'Men' ? 'shirts' : 'shirts-and-blouses',
    Pants: 'trousers',
    'Hoodies / Sweatshirt': 'hoodies-sweatshirts',
  };
  return types[type] || '';
};

const selectPageId = (type: string, gender: string): string => {
  const pageIds: { [key: string]: { [key: string]: string } } = {
    Men: {
      Shirts: 'men_shirts',
      Pants: 'men_trousers',
      'Hoodies / Sweatshirt': 'men_hoodiessweatshirts',
    },
    Women: {
      Shirts: 'ladies_shirtsblouses',
      Pants: 'ladies_trousers',
      'Hoodies / Sweatshirt': 'ladies_hoodiessweatshirts',
    },
  };

  return pageIds[gender as keyof typeof pageIds]?.[type as keyof typeof pageIds[typeof gender]] || '';
};

async function searchProducts(query: string, type: string, gender: string) {
  const pageId = selectPageId(type, gender);
  const genderFormatted = formatGender(gender);
  const typeFormatted = formatType(gender, type);

  if (!pageId || !genderFormatted || !typeFormatted) {
    throw new Error('Invalid parameters for product search');
  }

  const response = await fetch(`http://localhost:8080/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      page: '1',
      pageId: `/${genderFormatted}/shop-by-product/${typeFormatted}`,
      PageSize: '36',
      CategoryId: `/${pageId}`,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}
