# User Story: US-001 - Agregação de Contas Bancárias
# Critério de Aceitação: Latência de sincronização inferior a 5 segundos
@critical @regression
Feature: Agregação de Contas Bancárias

  Background: Autenticação do Utilizador
    Given que o utilizador efetuou login com sucesso na plataforma

  Scenario Outline: Sincronização de dados em tempo real
    Given que o utilizador está na página de gestão financeira
    When solicita a sincronização com a entidade "<entidade>"
    Then os dados devem ser atualizados em menos de 5 segundos

    Examples:
      | entidade |
      | Banco A  |