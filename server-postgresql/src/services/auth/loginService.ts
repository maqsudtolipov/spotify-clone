interface LoginService {
  email: string;
  password: string;
}

export const loginService = async(data: LoginService) => {
  res.status(200).json({
    status: 'success',
  })
}