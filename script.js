document.addEventListener('DOMContentLoaded', function() {
    const pcUpload = document.getElementById('pc-upload');
    const categorySelect = document.getElementById('category-select');
    const imageContainer = document.querySelector('.image-container');

    // Cargar imágenes guardadas al cargar la página
    loadSavedImages();

    function handleImageUpload(event) {
        const file = event.target.files[0];
        const category = categorySelect.value;

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageData = e.target.result;
                saveImageToLocalStorage(file.name, imageData, category);
                addImageToGallery(file.name, imageData, category);
            };
            reader.readAsDataURL(file);
        }
    }

    function saveImageToLocalStorage(name, data, category) {
        let images = JSON.parse(localStorage.getItem('images')) || [];
        images.push({ name, data, category });
        localStorage.setItem('images', JSON.stringify(images));
    }

    function loadSavedImages() {
        let images = JSON.parse(localStorage.getItem('images')) || [];
        images.forEach(image => {
            addImageToGallery(image.name, image.data, image.category);
        });
    }

    function addImageToGallery(name, data, category) {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'image-item';
        imageDiv.setAttribute('data-category', category);

        const img = document.createElement('img');
        img.src = data;
        img.alt = name;

        const categoryLabel = document.createElement('p');
        categoryLabel.textContent = `Categoría: ${category}`;
        categoryLabel.className = 'category-label';

        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = 'Descargar';
        downloadBtn.className = 'download-btn';
        downloadBtn.onclick = function() {
            const link = document.createElement('a');
            link.href = data;
            link.download = name;
            link.click();
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Borrar';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function() {
            imageContainer.removeChild(imageDiv);
            removeImageFromLocalStorage(name);
        };

        imageDiv.appendChild(img);
        imageDiv.appendChild(categoryLabel);
        imageDiv.appendChild(downloadBtn);
        imageDiv.appendChild(deleteBtn);
        imageContainer.appendChild(imageDiv);
    }

    function removeImageFromLocalStorage(name) {
        let images = JSON.parse(localStorage.getItem('images')) || [];
        images = images.filter(image => image.name !== name);
        localStorage.setItem('images', JSON.stringify(images));
    }

    pcUpload.addEventListener('change', handleImageUpload);
});