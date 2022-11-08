// import functions and grab DOM elements
import { renderMushroom, renderMagMushroom, renderFriend } from './render-utils.js';

const friendsEl = document.querySelector('.friends');
const friendInputEl = document.getElementById('friend-input');
const mushroomsEl = document.querySelector('.mushrooms');
const addMushroomButton = document.getElementById('add-mushroom-button');
const eatMagicButton = document.getElementById('eat-magic-button');
const addFriendButton = document.getElementById('add-friend-button');

// initialize state

let mushroomCount = 3;
let magicCount = 0;

const friendData = [
    {
        name: 'Erich',
        satisfaction: 2,
    },
    {
        name: 'Sarah',
        satisfaction: 3,
    },
    {
        name: 'Missael',
        satisfaction: 1,
    },
    {
        name: 'Soraya',
        satisfaction: 2,
    },
];

addMushroomButton.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        alert('found a mushroom!');

        mushroomCount++;
        displayMushrooms();
    } else if (magicCount < 1 && Math.random() > 0.7) {
        alert('found a magic mushroom!!!');

        magicCount++;
        displayMushrooms();
    } else {
        alert('no luck!');
    }
});

eatMagicButton.addEventListener('click', () => {
    magicCount--;
    displayMushrooms();
    for (let friend of friendData) {
        friend.satisfaction = 3;
    }
    alert('Everyone feels great! Invite more friends!!');
    displayFriends();
});

addFriendButton.addEventListener('click', () => {
    // get the name from the input
    const value = friendInputEl.value;

    // create a new friend object
    const newFriend = {
        name: `${value}`,
        satisfaction: 1,
    };
    // push it into the friends state array, passed in as an argument
    friendData.push(newFriend);
    // reset the input
    friendInputEl.value = '';
    // display all the friends (use a function here)
    displayFriends();
});

function displayFriends() {
    // clear out the friends in DOM
    // for each friend in state . . .
    // use renderFriend to make a friendEl
    // this is a clickable list, so . . .
    //         and if the friend's satisfaction level is below 3 and you have mushrooms left
    //     add an event listener to each friend
    //             then display your friends and mushrooms with the updated state
    friendsEl.textContent = '';
    for (let friend of friendData) {
        const friendEl = renderFriend(friend);
        friendEl.addEventListener('click', () => {
            if (friend.satisfaction < 3 && mushroomCount > 0) {
                friend.satisfaction++;
                mushroomCount--;
                displayMushrooms();
                displayFriends();
            } else if (friend.satisfaction < 3 && mushroomCount === 0) {
                alert('You need to go mushroom hunting!');
            }
        });
        friendsEl.append(friendEl);
        // append the friendEl to the friends list in DOM
    }
}

function displayMushrooms() {
    // clear out the mushroom div
    mushroomsEl.textContent = '';
    for (let i = 0; i < mushroomCount; i++) {
        // for each mushroom in your mushroom state, render and append a mushroom
        const mushroom = renderMushroom(i);
        mushroomsEl.append(mushroom);
    }
    for (let e = 0; e < magicCount; e++) {
        // for each mushroom in your mushroom state, render and append a mushroom
        const magicMushroom = renderMagMushroom(e);
        mushroomsEl.append(magicMushroom);
    }
    if (magicCount > 0) {
        eatMagicButton.classList.remove('hide');
    } else {
        eatMagicButton.classList.add('hide');
    }
}

displayFriends();
displayMushrooms();
