```mermaid
erDiagram
  PensionPot {
    string id PK
    string potName
    string employer
    string providerId FK
    float annualInterestRate
    float defaultAnnualInterestRate
    float amount
    float monthlyPayment
    boolean isWorkplacePension
    datetime lastUpdatedAt
  }

  PensionProvider {
    string id PK
    string name
  }

  PensionPot ||--o| PensionProvider : ""
```
