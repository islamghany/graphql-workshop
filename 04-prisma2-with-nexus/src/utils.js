const { verify } = reqire('jsonwebtoken');

 const getUserId = (context)=> {
  const Authorization = context.request.req.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = verify(token, 'APP_SECRET');
    return verifiedToken && verifiedToken.userId;
  }
}
module.exports ={getUserId}