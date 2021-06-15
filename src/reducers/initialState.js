export const initialState =
{
  isLogin: false,
  userInfo: {
    user_id: '',
    name: '',
    nickname: '',
    email: '',
    user_image: ''
  },
  notifications: 0,
  accessToken: '',
  search: {
    category: 'title',
    queryString: ''
  },
  isGoogle: 0,
  items: [],

  itemCategory: ['주거용품', '가구용품', '취침용품', '주방용품', '악세사리', '기타용품', '방한용품'],
  domain: 'http://localhost:4000'

}
