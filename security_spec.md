# Invariants
1. Licenças só podem ser acessadas pelo próprio usuário (onde `licencaId == request.auth.uid`) ou por Admins.
2. Clientes (não admins) só podem atualizar o campo `device_id`, e apenas UMA VEZ (se o `device_id` atual estiver vazio).
3. Clientes não podem alterar validade, status, clienteNome, sistema ou userId.

# "Dirty Dozen" Payloads
1. Null/Empty ID payload
2. Array for string payload
3. Status updated by non-admin payload
4. Non-matching update schema payload
5. Multiple fields changed besides device_id payload
6. Updating device_id when it's not empty payload
7. Overly large string payload (Denial of Wallet)
8. Incorrect property type payload
9. ID Mismatch Payload (user updating another user's doc)
10. Unauthenticated access
11. Unauthorized field read (Blanket query)
12. Creating a document as non-admin

# Test Runner
*(Conceptual. The rules focus on Admins doing CRUD and Users just doing read/update `device_id`)*
