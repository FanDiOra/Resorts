function onClickVille(ville) {
    let _ville = ville;
    window.localStorage.setItem('ville' , _ville);
    window.location.href="ville.html";
}