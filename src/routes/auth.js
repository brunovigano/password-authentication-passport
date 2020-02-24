const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/registrar_usuario', (req, res, next) => {
  passport.authenticate('local', function(err, usuario, info) {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!usuario) {
      return res.status(400).json({ errors: 'Usuário não encontrado' });
    }
    req.logIn(usuario, function(err) {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      return res.status(200).json({ success: `logado como ${usuario.id}` });
    });
  })(req, res, next);
});

module.exports = router;
