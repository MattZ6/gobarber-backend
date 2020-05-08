# Recuperação de senha

**RF (Requisitos funcionais)**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF (Requisitos não funcionais)**

- Utilizar Mailtrap para testar envio de e-mails em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN (Regras de negócio)**

- O link enviado por e-mail para resetar senha deve expirar em 1h;
- O usuário precisa confirmar a nova senha ao resetar sua senha antiga;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado por outro usuário;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

# Agendamento de serviços

**RF**

- O usuário deve poder visualizar todos os prestadores de serviço cadastrados;
- O usuário deve poder visualizar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder visualizar os horários disponíveis em um dia de serviço de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8:00h (primeiro) às 18:00 (último às 17:00h);
- O usuário não pode agendar num horário ocupado;
- O usuário não pode agendar um horário em uma data/hora que já passou;
- O usuário não pode agendar um horário consigo;
