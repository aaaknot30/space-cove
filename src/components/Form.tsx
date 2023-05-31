export default function Form() {
  return (
    <form action="/api/form/" method="post">
      <label htmlFor="first">First Name</label>
      <input type="text" id="first" name="first" required />
      <br />
 
      <label htmlFor="last">Last Name</label>
      <input type="text" id="last" name="last" required />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}