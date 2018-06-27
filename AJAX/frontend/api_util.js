const APIUtil = {
  followUser: id => {
    return $.ajax({
      method: 'POST',
      url:  `/users/${id}/follow`, 
      dataType: 'json'
    }); 
  },
  
  unfollowUser: id => {
    return $.ajax({
      method: 'DELETE',
      url: `/users/${id}/follow`, 
      dataType: 'json'
    }); 
  },
  
  searchUsers: (queryVal, successCB) => {
    return $.ajax({
      method: 'GET', 
      url: '/users/search', 
      dataType: 'json', 
      data: {
        username: queryVal
      }
    });
  }
  
  
  
};

module.exports = APIUtil;