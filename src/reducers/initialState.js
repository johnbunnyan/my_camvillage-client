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
  }
}
