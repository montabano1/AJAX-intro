class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = $('.users-search').val();
    this.ul = $('.users-search > ul');
  }
}



module.exports = UsersSearch;