@critical @regression
Feature: Agregação de Contas Bancárias

  Scenario Outline: Sincronização de dados em tempo real
    Given que o utilizador empresarial está na página de gestão financeira 
    When solicita a sincronização com a entidade "<entidade>"
    Then os dados devem ser atualizados em menos de 5 segundos 
    And o saldo consolidado deve refletir as transações recentes 

    Examples:
      | entidade |
      | Banco A  |
      | Banco B  |