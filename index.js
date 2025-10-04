const API_URL = "http://localhost:3000/posts";


async function getPosts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Не вдалося завантажити пости");
        return await response.json();
    } catch (error) {
        console.error("GET error:", error);
    }
}


async function createPost(post) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post)
        });
        if (!response.ok) throw new Error("Не вдалося створити пост");
        return await response.json();
    } catch (error) {
        console.error("POST error:", error);
    }
}


async function updatePost(id, updatedPost) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedPost)
        });
        if (!response.ok) throw new Error("Не вдалося оновити пост");
        return await response.json();
    } catch (error) {
        console.error("PUT error:", error);
    }
}


async function patchPost(id, partialData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(partialData)
        });
        if (!response.ok) throw new Error("Не вдалося оновити пост (PATCH)");
        return await response.json();
    } catch (error) {
        console.error("PATCH error:", error);
    }
}


async function deletePost(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Не вдалося видалити пост");
        return true;
    } catch (error) {
        console.error("DELETE error:", error);
    }
}

getStudentsBtn.addEventListener("click", getStudents);
addStudentForm.addEventListener("submit", addStudent);