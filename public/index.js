// Your code here
var apicat
var mykey = 'live_WbriYxw1fYV8bKBHZmXvMFFWRf25wBNC7dKXHwF70OBvMqYtKv1Ms1wXFago2KDg'

window.addEventListener('load', () => {
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.display = 'flex';
    document.body.style.flexDirection = 'column';
    document.body.style.alignItems = 'center';
    var el = document.createElement('div');
    el.setAttribute('class', 'container');
    document.body.appendChild(el);
    var myhead = document.createElement('h1');
    var mystrong = document.createElement('strong');
    mystrong.innerHTML = 'Kitten Pic';
    myhead.appendChild(mystrong);
    el.appendChild(myhead);
    var mypic = document.createElement('img');

    if (localStorage.getItem("hasCat") === null) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myjson = JSON.parse(xhr.response);
        console.log(myjson[0].url);
        mypic.setAttribute('src', myjson[0].url);
        var catobject = { 'url' : myjson[0].url, 'upvotes' : 0, 'downvotes' : 0, 'comments' : [] };
        localStorage.setItem(myjson[0].url, JSON.stringify(catobject));
        localStorage.setItem('hasCat', myjson[0].url);
        }
    };
    xhr.open("GET", "https://api.thecatapi.com/v1/images/search", true);
    xhr.setRequestHeader('x-api-key', mykey);
    xhr.send();
} else {
    var caturl = localStorage.getItem("hasCat");
    mypic.setAttribute('src', caturl)
};
    mypic.setAttribute('class', 'catpic');
    mypic.setAttribute('id', 'catpic');
    el.appendChild(mypic);
    var newcat = document.createElement('button');
    newcat.type = 'button';
    newcat.addEventListener('click', randomcat);
    newcat.setAttribute('class', 'catbutton');
    newcat.innerHTML = 'NEXT';
    mypic.insertAdjacentElement('afterend', newcat);
    var myscore = document.createElement('p');
    myscore.setAttribute('id', 'myscore');
    if (localStorage.getItem(mypic.src) === null) {
    myscore.innerHTML = "Popularity Score = 0";
    } else {
        var score = localStorage.getItem(mypic.src);
        jsonscore = JSON.parse(score);
        var h = jsonscore.upvotes-jsonscore.downvotes;
        myscore.innerHTML = "Popularity Score = " + h.toString();
    }
    var upvote = document.createElement('button');
    upvote.innerHTML = "Upvote";
    upvote.addEventListener('click', function() {
        var currenturl = document.getElementById('catpic').src;
        var catobject = localStorage.getItem(currenturl);
        if (catobject === null) {
            var newcatobject = { 'url' : currenturl, 'upvotes' : 1, 'downvotes' : 0, 'comments' : []};
            localStorage.setItem(currenturl, JSON.stringify(newcatobject));
            myscore.innerHTML = "Popularity Score = 1";
        } else {
        catobject = JSON.parse(catobject);
        var myupvotes = catobject.upvotes;
        var mydownvotes = catobject.downvotes;
        myupvotes++;
        var myvotes = myupvotes-mydownvotes;
        catobject.upvotes = myupvotes;
        localStorage.setItem(currenturl, JSON.stringify(catobject));
        myscore.innerHTML = "Popularity Score = " + myvotes.toString();
        };
    });
    var downvote = document.createElement('button');
    downvote.innerHTML = "Downvote";
    downvote.addEventListener('click', function() {
        var currenturl = document.getElementById('catpic').src;
        var catobject = localStorage.getItem(currenturl);
        if (catobject === null) {
            var newcatobject = { 'url' : currenturl, 'upvotes' : 0, 'downvotes' : 1, 'comments' : []};
            localStorage.setItem(currenturl, JSON.stringify(newcatobject));
            myscore.innerHTML = "Popularity Score = -1";
        } else {
        catobject = JSON.parse(catobject);
        var myupvotes = catobject.upvotes;
        var mydownvotes = catobject.downvotes;
        mydownvotes++;
        var myvotes = myupvotes-mydownvotes;
        catobject.downvotes = mydownvotes;
        localStorage.setItem(currenturl, JSON.stringify(catobject));
        myscore.innerHTML = "Popularity Score = " + myvotes.toString();
        };
    });
    var votebox = document.createElement('div');
    votebox.setAttribute('id', 'votebox');
    votebox.setAttribute('class', 'container');
    votebox.style.display = 'flex';
    votebox.style.flexDirection = 'row';
    votebox.appendChild(downvote);
    votebox.appendChild(upvote);
    var commentArea = document.createElement('div');
    commentArea.setAttribute('id', 'commentArea');
    document.body.appendChild(commentArea);
    commentArea.style.border = '1px solid black';
    commentArea.style.width = '50%';
    commentArea.style.minHeight = '150px';
    var myurl = mypic.src;
    if ( localStorage.getItem(myurl) != null) {
        var catobject = localStorage.getItem(myurl);
        var jsonobject = JSON.parse(catobject);
        var mycomments = jsonobject.comments;
        for (let i=0;i<mycomments.length;i++) {
            var comment = document.createElement('div');
            comment.innerHTML = mycomments[i];
            comment.style.borderTop = '1px solid black';
            comment.style.padding = '10px';
            document.getElementById('commentArea').appendChild(comment);
        };
    }
    var form = document.createElement('form');
    var label = document.createElement('label');
    label.innerHTML = 'Comment: ';
    var input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('placeholder', 'Add A Comment');
    var submit = document.createElement('button');
    submit.innerHTML = 'Submit';
    submit.type = 'button';
    submit.addEventListener('click', function() {
        var comment = document.createElement('div');
        comment.innerHTML = input.value;
        comment.style.borderTop = '1px solid black';
        comment.style.padding = '10px';
        commentArea.appendChild(comment);
        var currenturl = document.getElementById('catpic').src;
        var catobject = localStorage.getItem(currenturl);
        if (catobject === null) {
            var newcatobject = { 'url' : currenturl, 'upvotes' : 0, 'downvotes' : 0, 'comments' : [input.value]};
            localStorage.setItem(currenturl, JSON.stringify(newcatobject));
        } else {
        var jsonobject = JSON.parse(catobject);
        jsonobject.comments.push(input.value);
        localStorage.setItem(currenturl, JSON.stringify(jsonobject));
        input.value = '';
        }
    })
    input.style.width = '70%';
    form.style.width = '100%';
    form.style.display = 'flex';
    form.style.flexDirection = 'row';
    form.style.alignItems = 'center';
    form.style.justifyContent = 'stretch';
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(submit);
    mypic.insertAdjacentElement('afterend', form);
    mypic.insertAdjacentElement('afterend', votebox);
    mypic.insertAdjacentElement('afterend', myscore);
});

var randomcat = function(ev) {
    var xhr = new XMLHttpRequest();
    var mypic = document.getElementById('catpic');
    xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myjson = JSON.parse(xhr.response);
        console.log(myjson[0].url);
        mypic.setAttribute('src', myjson[0].url);
        localStorage.setItem('hasCat', myjson[0].url);
        var myurl = mypic.src; 
        if (localStorage.getItem(myurl) === null) {
            var catobject = { 'url' : myurl, 'upvotes' : 0, 'downvotes' : 0, 'comments' : [] };
            localStorage.setItem(myurl, JSON.stringify(catobject));
            document.getElementById('myscore').innerHTML = "Popularity Score = 0";
            document.getElementById('commentArea').innerHTML = "";
        } else {
            var catobject = localStorage.getItem(myurl);
            var jsonobject = JSON.parse(catobject);
            var myupvotes = jsonobject.upvotes;
            var mydownvotes = jsonobject.downvotes;
            var mycomments = jsonobject.comments;
            document.getElementById('myscore').innerHTML = "Popularity Score = " + myupvotes-mydownvotes.toString();
            for (let i=0;i<mycomments.length;i++) {
                var comment = document.createElement('div');
                comment.innerHTML = mycomments[i];
                comment.style.borderTop = '1px solid black';
                comment.style.padding = '10px';
                document.getElementById('commentArea').appendChild(comment);
            };
        };
        }
    };
    xhr.open("GET", "https://api.thecatapi.com/v1/images/search", true);
    xhr.setRequestHeader('x-api-key', mykey);
    xhr.send();
};
