module.exports = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);

  try {
    const [loginEmail] = await db.transaction(async (trx) => {
      await trx
        .insert({
          hash: hash,
          email: email,
        })
        .into('login')
        .returning('email');

      const user = await trx('users').returning('*').insert({
        email: loginEmail.email,
        name: name,
        joined: new Date(),
      });

      return user;
    });

    res.json(loginEmail);
  } catch (err) {
    console.error(err);
    res.status(400).json('Unable to register');
  }
};
