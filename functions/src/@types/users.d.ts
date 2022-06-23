type Like = {
  id: string
  report: {
    id: string
    ref: import('firebase-admin/firestore').DocumentReference
  }
}
