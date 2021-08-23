function sanitize(item){
  const stringRequest1 = /(You received this message because you are subscribed to the Google Groups "LocumSg" group.).*/g
  const stringRequest2 = /(To unsubscribe from this group and stop receiving emails from it, send an email to locumsg\+unsubscribe@googlegroups.com.).*/g
  const stringRequest3 = /(To view this discussion on the web visit).*/g
  const stringRequest4 = /\r?\n\r/g
  const sanitize = item.Body.replaceAll(stringRequest1, '')
  const sanitize2 = sanitize.replaceAll(stringRequest2, '')
  const sanitize3 = sanitize2.replaceAll(stringRequest3, '')
  const sanitize4 = sanitize3.replaceAll(stringRequest4, '')
  return sanitize4
     
}

export default sanitize()