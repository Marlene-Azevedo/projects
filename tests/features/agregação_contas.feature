# User Story: US-001 - Agregação de Contas Bancárias
# Cobertura: Performance, Escalabilidade, Segurança e Resiliência
@critical @regression
Feature: Agregação de Contas Bancárias

  Background: Autenticação do Utilizador
    Given que o utilizador efetuou login com sucesso na plataforma
    And o utilizador está na página de gestão financeira

  # AC 1: Sincronização em tempo real (< 5s)
  @performance
  Scenario Outline: Sincronização de dados em tempo real
    When solicita a sincronização com a entidade "<entidade>"
    Then os dados devem ser atualizados em menos de 5 segundos

    Examples:
      | entidade |
      | Banco A  |
      | Banco B  |

  # Unhappy Path (Cenário de Falha)
  @error_handling @resilience
  Scenario: Sincronização falha após esgotar tentativas de retry
    Given que a entidade bancária está temporariamente indisponível
    When solicita a sincronização com a entidade "Banco C"
    Then o sistema deve realizar 3 tentativas de sincronização automaticamente
    And deve exibir uma notificação de erro final por timeout após a última tentativa
    And o botão de sincronização deve permitir uma nova tentativa manual

  # Edge Case (Caso de Fronteira)
  @edge_case
  Scenario: Sincronização de conta sem movimentos recentes
    Given que a conta agregada não possui transações nos últimos 12 meses
    When solicita a sincronização com a entidade "Banco A"
    Then os dados devem ser atualizados em menos de 5 segundos
    And deve exibir a mensagem "Nenhum movimento recente encontrado"

  # AC 2: Suporte a vasta gama de entidades (+2500)
  @scalability
  Scenario: Pesquisa e seleção de entidades financeiras
    When acede à lista de instituições suportadas
    Then deve conseguir visualizar e filtrar entre as mais de 2500 entidades disponíveis

  # AC 3: Validação de credenciais e segurança
  @security
  Scenario: Validação de segurança na agregação de conta
    When introduz as credenciais bancárias para a nova entidade
    Then o sistema deve validar a conexão com encriptação de ponta a ponta
    And deve exibir a confirmação de conta agregada com sucesso

  # AC 4: Tratamento de erros e Retry Automático
  @resilience
  Scenario: Tratamento de erro de conexão com retry automático
    Given que existe uma instabilidade temporária na ligação ao banco
    When tenta sincronizar os dados bancários
    Then o sistema deve executar um retry automático
    And deve exibir uma notificação clara sobre o estado da ligação