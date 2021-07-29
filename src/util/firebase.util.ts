import * as admin from 'firebase-admin';

export async function fbCreateUser(name: string, email: string, password): Promise<any> {
    return await admin.auth().createUser({
        displayName: name,
        email,
        password,
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/srp-telematica.appspot.com/o/profilePicture%2Fplaceholder.png?alt=media&token=662aad10-202f-4c9a-8abd-b5aec2f27a9f'
    });
}

export async function fbValidateToken(token: string): Promise<any> {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const user = await admin.auth().getUser(decodedToken.uid);
        return {
            ...decodedToken,
            customClaims: user.customClaims,
            display_name: user.displayName,
            photo_URL: user.photoURL
        };
    } catch (error) {
        return null;
    }

}

export async function fbSetStudentClaim(uid: string): Promise<void> {
    try {
        await admin.auth().setCustomUserClaims(uid, {isStudent: true});
    } catch (error) {

    }
}

export async function fbSetProfessorClaim(uid: string): Promise<void> {
    try {
        await admin.auth().setCustomUserClaims(uid, {isProfessor: true});
    } catch (error) {

    }
}

export async function fbCreateUserOnFirestore(uid: string, name: string): Promise<any> {
    return await admin.firestore().collection('users').doc(uid).create({name});
}

export async function fbCreateNotification(uid: string, title: string, description: string, fullDescription?: string, url?: string): Promise<any> {
    return await admin.firestore()
        .collection('users')
        .doc(uid)
        .collection('notifications')
        .add({
            title,
            description,
            fullDescription: fullDescription ?? '',
            url: url ?? '',
            read: false,
            created: new Date().getTime()
        });
}

export async function fbCreateCourseOnFirestore(id: string, name: string): Promise<any> {
    return await admin.firestore().collection('courses').doc(id).create({name});
}
