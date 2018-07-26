function expandGroups(event) {
  var els = document.getElementsByClassName('title');
  if (event === 'touchend') {
    event.preventDefault();
  }
  Array.prototype.forEach.call(els, function(el) {
    el.addEventListener(event, function () {
      el.parentElement.classList.toggle('expand');
      if(el.classList.contains('flash')) {
        el.classList.remove('flash');
      }
    }, false);
  });
}

// build headers for requests
function buildHeader() {
  var head = new Headers();
  head.append('pragma', 'no-cache');
  head.append('cache-control', 'no-cache');

  var init = {
    method: 'GET',
    headers: head
  };
  return init;
}

// pull highlights content
function pullHighlights() {
  return fetch('content/career.json', buildHeader()).then(function(response) {
    return response.json();
  });
}

// pull projects content
function pullProjects() {
  return fetch('content/projects.json', buildHeader()).then(function(response) {
    return response.json();
  });
}

// pull interests content
function pullInterests() {
  return fetch('content/interests.json', buildHeader()).then(function(response) {
    return response.json();
  });
}

function highlights() {
  var h = document.getElementById('happenings');
  pullHighlights().then(function(r) {
    document.getElementsByClassName('loading')[0].classList.add('hide');
    r.data.forEach(function (x) {
      h.innerHTML += '<li class="' + x.type +
        '"><div class="left">' + x.date +
        '</div><div class="desc"><div>' + x.description.what + ' ' +
        '<em>' + x.description.emphasis + '</em></div><div class="info">' +
        x.description.info + '</div></div></li>';
    });
  });
}

function projects() {
  var p = document.getElementById('projects');
  var col = ["red", "blue", "green"];
  var c = 0;
  pullProjects().then(function(r) {
    document.getElementsByClassName('loading')[1].classList.add('hide');
    r.data.forEach(function (x) {
      var urlHTML = "<br>";
      for (l in x.links) {
          urlHTML += '[<a target="_blank" href="' + x.links[l].link_url +
            '">' + x.links[l].link_desc + '</a>] ';
      }
      p.innerHTML += '<li class="' + col[c % col.length] +
        '"><div class="left">' + x.title +
        '</div><div class="desc"><div>[<em>' + x.technology + '</em>] ' +
        x.description + ' ' + urlHTML + '</div></li>';
      c++;
    })
  })
}

function interests() {
  var p = document.getElementById('interests');
  var col = ["red", "blue", "green"];
  var c = 0;
  pullInterests().then(function(r) {
    document.getElementsByClassName('loading')[2].classList.add('hide');
    r.data.forEach(function (x) {
      var urlHTML = "<br>";
      for (l in x.links) {
          urlHTML += '[<a target="_blank" href="' + x.links[l].link_url +
            '">' + x.links[l].link_desc + '</a>] ';
      }
      p.innerHTML += '<li class="' + col[c % col.length] +
        '"><div class="left ' + x.icon + '">' + x.title +
        '</div><div class="desc"><div>' +
        x.description + ' ' + urlHTML + '</div></li>';
      c++;
    })
  })
}

// get all the contents jazz
(function () {
  window.addEventListener('load', function() {
    highlights();
    projects();
    interests();
    expandGroups('click');
    expandGroups('touchend');
  }, false);
})();
