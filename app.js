// Inicialización de Firebase
const auth = firebase.auth();
const db = firebase.firestore();

// Función para crear un post
document.getElementById('createPostForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

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
        await db.collection('posts').add({
            title,
            content,
            price,
            category,
            authorId: user.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            buyers: []
        });

        Swal.fire({
            icon: 'success',
            title: '¡Post creado!',
            text: 'Tu post ha sido publicado correctamente.',
            confirmButtonColor: '#6366f1'
        }).then(() => {
            window.location.href = 'feed.html'; // Redirigir al feed
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
            confirmButtonColor: '#6366f1'
        });
    }
});

// Función para comprar un post
async function buyPost(postId, price) {
    const user = auth.currentUser;
    if (!user) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debes iniciar sesión para comprar un post.',
            confirmButtonColor: '#6366f1'
        });
        return;
    }

    const postRef = db.collection('posts').doc(postId);
    const postDoc = await postRef.get();
    const post = postDoc.data();

    if (post.buyers.includes(user.uid)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ya has comprado este post.',
            confirmButtonColor: '#6366f1'
        });
        return;
    }

    const userRef = db.collection('users').doc(user.uid);
    const userDoc = await userRef.get();
    const userCoins = userDoc.data().coins || 0;

    if (userCoins < price) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No tienes suficientes monedas para comprar este post.',
            confirmButtonColor: '#6366f1'
        });
        return;
    }

    await userRef.update({ coins: userCoins - price });
    await postRef.update({ buyers: firebase.firestore.FieldValue.arrayUnion(user.uid) });

    Swal.fire({
        icon: 'success',
        title: '¡Compra exitosa!',
        text: 'Ahora puedes ver el post.',
        confirmButtonColor: '#6366f1'
    }).then(() => {
        window.location.reload(); // Recargar la página para mostrar el post
    });
}

// Función para cargar posts en una categoría
async function loadPosts(category) {
    const postsRef = db.collection('posts').where('category', '==', category);
    const querySnapshot = await postsRef.get();
    const user = auth.currentUser;

    querySnapshot.forEach((doc) => {
        const post = doc.data();
        const isAuthor = user && post.authorId === user.uid;
        const isBuyer = user && post.buyers.includes(user.uid);

        // Mostrar título y precio a todos
        console.log(`Título: ${post.title} - Precio: ${post.price} monedas`);

        // Mostrar contenido completo si es el autor o ha comprado el post
        if (isAuthor || isBuyer) {
            console.log(`Contenido: ${post.content}`);
        } else if (user) {
            console.log(`<button onclick="buyPost('${doc.id}', ${post.price})">Comprar</button>`);
        }
    });
}

// Cargar posts al abrir la página
const category = window.location.pathname.split('/').pop().replace('.html', '');
if (category) loadPosts(category);
