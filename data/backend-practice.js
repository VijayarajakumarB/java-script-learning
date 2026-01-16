const xht = new XMLHttpRequest();

xht.addEventListener('load', () => {
    console.log(xht.response);
});

xht.open('GET', 'https://supersimplebackend.dev/not-supported');
xht.send();