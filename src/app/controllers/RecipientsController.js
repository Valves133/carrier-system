import * as Yup from 'yup';

import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const schema = await Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.number().required(),
      complemento: Yup.string(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const {
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    } = await Recipients.create(req.body);

    return res.json({
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    });
  }
}

export default new RecipientsController();
