/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

class FollowToggle {
  constructor(el) {
    let $el = $(el);
    this.user_id = $el.context.dataset.userId;
    this.followState = $el.context.dataset.followState;
    this.render($el);
  }
  
  render($el) {
    // 
    if ($el.context.dataset.followState === 'unfollowed') {
      $el.text('Follow!');
    } else {
      $el.text('Unfollow!');
    }
  }
  
  handleClick (e) {
    
  }
}


module.exports = FollowToggle;

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");
const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");
const UsersSearch = __webpack_require__(/*! ./users_search */ "./frontend/users_search.js");

const usersSearchCB = function () {
  $('nav.users-search').each((idx, search) => {
    new UsersSearch(search);
  });
  
  $('nav.users-search').on('keypress', (e) => {
    APIUtil.searchUsers(e.$input, () => {
      
    });
    
  });
};

const followToggleCB = function () {
  $('.follow-toggle').each((idx,toggle) => {
    new FollowToggle(toggle);
  });
  
  $('.follow-toggle').on('click', (e) => {
    e.preventDefault();
    if ($(e.currentTarget).context.dataset.followState === 'unfollowed') {
      APIUtil.followUser($(e.currentTarget).context.dataset.userId).then($(e.currentTarget).context.dataset.followState = 'followed');
    } else {
      APIUtil.unfollowUser($(e.currentTarget).context.dataset.userId).then($(e.currentTarget).context.dataset.followState = 'unfollowed');
    }
    FollowToggle.prototype.render($(e.currentTarget));
  });
};

$( () => {
  followToggleCB();
  usersSearchCB();
});

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = $('.users-search').val();
    this.ul = $('.users-search > ul');
  }
}



module.exports = UsersSearch;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map