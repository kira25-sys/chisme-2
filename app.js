// Función para crear un post
document.getElementById('createPostForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Previene el envío tradicional del formulario

    console.log("Formulario enviado");

    const user = auth.currentUser;
    if (!user) {
        console.warn("Usuario no autenticado");
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

    console.log("Datos del formulario:", { title, content, price, category });

    if (price > 50) {
        console.warn("Precio excede el máximo permitido");
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El precio máximo es de 50 monedas.',
            confirmButtonColor: '#6366f1'
        });
        return;
    }

    try {
        console.log("Intentando guardar el post en Firestore...");

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

        console.log("Post guardado correctamente en Firestore");

        // Mostrar mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: '¡Post creado!',
            text: 'Tu post ha sido publicado correctamente.',
            confirmButtonColor: '#6366f1'
        }).then(() => {
            // Redirigir a la página de la categoría seleccionada
            console.log("Redirigiendo a:", `${category}.html`);
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
