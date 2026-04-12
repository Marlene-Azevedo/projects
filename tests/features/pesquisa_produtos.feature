# User Story: US-002 - Pesquisa Inteligente de Produtos Bancários
# Cobertura: Performance de Pesquisa, Persistência de Filtros e Recomendação
@critical @regression
Feature: Pesquisa Inteligente de Produtos Bancários

  Background: Autenticação e Navegação
    Given que o utilizador efetuou login com sucesso na plataforma
    And o utilizador acede à área de "Pesquisa de Produtos"

  # AC 1 & AC 4: Happy Path - Performance e Filtros Múltiplos
  @performance @search
  Scenario Outline: Pesquisa de produtos com múltiplos filtros e alta performance
    When aplica os filtros de "<categoria>", "<taxa>" e "<comissao>"
    Then os resultados devem aparecer em menos de 2 segundos
    And a lista deve exibir produtos que correspondam exatamente aos critérios

    Examples:
      | categoria | taxa   | comissao |
      | Contas    | 1.5%   | Isenta   |
      | Seguros   | N/A    | Baixa    |

  # AC 2: Edge Case - Persistência de Filtros
  @navigation @edge_case
  Scenario: Persistência de critérios após navegação entre páginas
    Given que o utilizador aplicou o filtro "Empréstimos"
    And visualizou os detalhes de um produto específico
    When regressa à página de resultados de pesquisa
    Then os filtros anteriormente aplicados devem manter-se ativos

  # AC 3: Unhappy Path - Retry Mechanism e Recomendações Alternativas
  @resilience @unhappy_path
  Scenario: Tratamento de falha temporária na pesquisa com recomendação final
    Given que o motor de pesquisa apresenta instabilidade temporária
    When realiza uma pesquisa por "Seguro de Vida"
    Then o sistema deve tentar processar a pesquisa automaticamente até 3 vezes
    But se não houver resultados após os retries, deve mostrar produtos alternativos recomendados