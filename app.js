// Inicialización de Firebase
const auth = firebase.auth();
const db = firebase.firestore();

// Función para crear un post
document.getElementById('createPostForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Previene el envío tradicional del formulario

    const user = auth.currentUser;
    if (!user) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debes iniciar sesión para crear un post.',
            confirmButtonColor: '#6366f1'
        });
        return;
    }

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const price = parseInt(document.getElementById('price').value);
    const category = document.getElementById('category').value;

    if (price > 50) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El precio máximo es de 50 monedas.',
            confirmButtonColor: '#6366f1'
        });
        return;
    }

    try {
        // Guardar el post en Firestore
        await db.collection('posts').add({
            title,
            content,
            price,
            category,
            authorId: user.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            buyers: []
        });

        // Mostrar mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: '¡Post creado!',
            text: 'Tu post ha sido publicado correctamente.',
            confirmButtonColor: '#6366f1'
        }).then(() => {
            // Redirigir a la página de la categoría seleccionada
            window.location.href = `${category}.html`;
        });
    } catch (error) {
        // Manejar errores
        console.error("Error al publicar el post:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al publicar el post. Por favor, inténtalo de nuevo.',
            confirmButtonColor: '#6366f1'
        });
    }
});
