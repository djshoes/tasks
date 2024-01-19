import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

const config = {
    apiKey: "AIzaSyADQ8itRzk6_vRz344IsjEZvwIjtBCU7GE",
    authDomain: "taskmanager-11ae8.firebaseapp.com",
    projectId: "taskmanager-11ae8",
    storageBucket: "taskmanager-11ae8.appspot.com",
    messagingSenderId: "880512305983",
    appId: "1:880512305983:web:a9089054ff54db8071218a",
    measurementId: "G-SXLBJE9STL"
};

class Firebase {
    constructor() {
        // if (!app.apps.length) {
        //     app.initializeApp(config);
        // }
        this.app = initializeApp(config);
        //not sure how to use this, firebase said install it, maybe it connects and gives you analytics in the firebase console
        this.analytics = getAnalytics(this.app);
        // this.db = app.firestore();
        this.db = getFirestore(this.app);
    }

    signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                console.log(result)
                console.log(user)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    signOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('signed out')
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }

    saveToFirestore = async state => {
        await setDoc(doc(this.db, "users", state.userId), {
            notes: state.notes,
            projects: state.projects,
            todolist: state.todolist,
            templates: state.templates
        });
    }

    loadFromFirestore = async user => {
        const docRef = doc(this.db, "users", user);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
}

export default Firebase;