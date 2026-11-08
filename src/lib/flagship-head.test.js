import { describe, expect, test } from 'bun:test';
import { toolHeadData, catalogFlagshipHead } from './flagship-head';
import { agentTools } from '../data/tools-agents';

describe('tool page head data', () => {
  test('keeps the catalogue title, description and FAQs for a tool page', () => {
    const tool = agentTools.find((t) => t.slug === 'ai-agent-builder');
    const head = toolHeadData(agentTools, 'ai-agent-builder');
    expect(head.title).toBe(tool.title);
    expect(head.description).toBe(tool.description);
    expect(head.faqs.length).toBe((tool.faqs ?? []).length);
  });

  test('builds canonical URL and FAQ markup including page-only FAQs', () => {
    const head = catalogFlagshipHead(toolHeadData(agentTools, 'ai-crm'), 'BusinessApplication', [{ q: 'Extra?', a: 'Yes.' }]);
    expect(head.links[0].href).toBe('https://ammarai.com/ai-crm');
    expect(head.scripts[1].children).toContain('Extra?');
  });

  test('throws for an unknown tool instead of rendering an empty head', () => {
    expect(() => toolHeadData(agentTools, 'no-such-tool')).toThrow();
  });
});
