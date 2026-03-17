import { v } from 'convex/values';
import { action, mutation, query } from './_generated/server';
import { api } from './_generated/api';

/**
 * Returns the most recent numbers stored in the collection together with the active viewer name.
 */
export const listNumbers = query({
    args: {
        count: v.number(),
    },
    handler: async (ctx, args) => {
        const numberDocuments = await ctx.db
            .query('numbers')
            .order('desc')
            .take(args.count);

        return {
            viewer: (await ctx.auth.getUserIdentity())?.name ?? null,
            numbers: numberDocuments.reverse().map((document) => document.value),
        };
    },
});

/**
 * Inserts a number into the collection.
 */
export const addNumber = mutation({
    args: {
        value: v.number(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert('numbers', { value: args.value });
    },
});

/**
 * Demonstrates how to compose a query and mutation inside a Convex action.
 */
export const myAction = action({
    args: {
        first: v.number(),
        second: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.runQuery(api.myFunctions.listNumbers, {
            count: 10,
        });

        await ctx.runMutation(api.myFunctions.addNumber, {
            value: args.first,
        });
    },
});
