# Attraction pages — single source of truth

Each attraction / location page exists **once**, as a trip event in `tripEvents.json`.

## Routes

| Entry point | Opens |
|-------------|--------|
| Trip timeline → day → event | `/trip/event/:eventId` |
| Home → Достопримечательности | `/sights` → same `/trip/event/:eventId` |

Never create a second detail page for the same location.

## Auto catalog

`dataService.getAttractionCatalog()` builds the `/sights` list from every trip event that has:

- `attractionDetails` — paid / ticketed attractions (Prometheus, Martvili, …)
- `eveningCityDetails` — evening city locations (Вечерний Кутаиси, …)

When you add a new location page with one of these payloads, it automatically appears in **Достопримечательности**. No duplicate JSON, no second component.

## Template (`attractionDetails`)

1. Title + short description  
2. Как проходит посещение (`visitFlow`)  
3. Gallery (6 unique photos)  
4. Краткая информация  
5. Как добраться  
6. Стоимость посещения  
7. Часы работы  
8. Что вас ждёт (6 other unique photos)  
9. Знаете ли вы?  
10. Что взять с собой  
11. Полезные советы  
12. Инфраструктура  
13. Следующий шаг  

## Images

- Reuse existing project files; do not copy duplicates.  
- ≥12 unique photos per attraction (6 gallery + 6 highlights).  
- No photo reuse inside one attraction.

## Check

```bash
npm run check:images
npm run lint
npm run build
```
