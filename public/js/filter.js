let filters = document.querySelectorAll(".filter");

for(let filter of filters){
    filter.addEventListener("click", (el)=>{
        let child =filter.children;
        let filterValue = child[1].innerText;
        el.stopPropagation();

        fetch('/listings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filterValue: filterValue })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);
            // Redirect to another route if needed
            window.location.href = `/filter-result?filter=${encodeURIComponent(filterValue)}`;
        })
        .catch(error => console.log('Error:', error));
    })
}
