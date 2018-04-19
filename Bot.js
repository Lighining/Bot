import discord
from discord.ext import commands
import asyncio
import random

bot = commands.Bot("/")

@bot.event
async def on_ready():
    print("Bot is online Run /ping to make sure i'm fully working!")
    await self.bot.change_presence(game=discord.Game(name="/help", type=1)) # That is the playing Status if you didnt know :D Change /help if you want.


@bot.command(pass_context=True)
async def ping(ctx):
    await bot.say(":ping_pong: Pong! :tada:")
    print("User has pinged!")


@bot.command(pass_context=True)
async def hello(ctx):
    await bot.say("hi :wave: How's it goin")

@bot.command(pass_context=True)
async def flipcoin(ctx):
    pick = ['Tails','Heads']
    flip = random.choice(pick)
    await bot.say ("The coin landed on " + flip + '!')

@bot.command(pass_context=True)
@commands.has_role("Staff")
async def kick(ctx, user: discord.Member):
    await bot.say(":boot: Cya, {}. Ya loser!".format(user.name))
    await bot.kick(user)

@bot.command(pass_context=True)
@commands.has_role("Staff")
async def ban(ctx, user: discord.Member):
    await bot.say(":boot: Off my lawn, {}. Ya loser!".format(user.name))
    await bot.ban(user)

@bot.command(pass_context=True)
@commands.has_role("Staff")
async def FuckOff(ctx, user: discord.Member):
    await bot.say("Fuck off {}, you bitch!!!!!".format(user.name))
    await bot.kick(user)

@bot.command(pass_context=True)
async def Owner(ctx):
    await bot.say("The Owner of the bot is x1Rpg God1x#7449 and the developer is xRedFlame_PvPx#2680")

@bot.command(pass_context=True)
async def info(ctx, user: discord.Member):
    embed = discord.Embed(title="{}'s info".format(user.name), description="Here's what I could find.", color=0x00ff00)
    embed.add_field(name="Name", value=user.name, inline=True)
    embed.add_field(name="ID", value=user.id, inline=True)
    embed.add_field(name="Status", value=user.status, inline=True)
    embed.add_field(name="Highest role", value=user.top_role)
    embed.add_field(name="Joined", value=user.joined_at)
    embed.set_thumbnail(url=user.avatar_url)
    await bot.say(embed=embed)

@bot.command(pass_context = True)
async def mute(ctx, member: discord.Member):
     if ctx.message.author.server_permissions.administrator or ctx.message.author.id == '194151340090327041':
        role = discord.utils.get(member.server.roles, name='Muted')
        await bot.add_roles(member, role)
        embed=discord.Embed(title="User Muted!", description="**{0}** was muted by **{1}**!".format(member, ctx.message.author), color=0xff00f6)
        await bot.say(embed=embed)
     else:
        embed=discord.Embed(title="Permission Denied.", description="You don't have permission to use this command.", color=0xff00f6)
        await bot.say(embed=embed)

@bot.command(pass_context = True)
async def unmute(ctx, member: discord.Member):
     if ctx.message.author.server_permissions.administrator or ctx.message.author.id == '305577209970819073':
        role = discord.utils.get(member.server.roles, name='Muted')
        await bot.remove_roles(member, role)
        embed=discord.Embed(title="User Unmuted!", description="**{0}** was unmuted by **{1}**!".format(member, ctx.message.author), color=0xff00f6)
        await bot.say(embed=embed)
     else:
        embed=discord.Embed(title="Permission Denied.", description="You don't have permission to use this command.", color=0xff00f6)
        await bot.say(embed=embed)

@bot.command(pass_context=True)
@commands.has_role("Staff") # This must be exactly the name of the appropriate role
async def addrole(ctx):
    member = ctx.message.author
    role = get(member.server.roles, name="VIP")
    await bot.add_roles(member, role)

@bot.command(pass_context=True)
@commands.has_role("Staff") # This must be exactly the name of the appropriate role
async def removerole(ctx):
    member = ctx.message.author
    role = get(member.server.roles, name="VIP")
    await bot.remove_roles(member, role)

@bot.command(pass_context=True)
async def serverinfo(ctx, user: discord.Member):
    embed = discord.Embed(name="{}'s info".format(ctx.message.server.name), description="Here's what I could find.", color=0x00ff00)
    embed.set_author(name="Info:")
    embed.add_field(name="Name", value=ctx.message.server.name, inline=True)
    embed.add_field(name="ID", value=ctx.message.server.id, inline=True)
    embed.add_field(name="Roles", value=len(ctx.message.server.roles), inline=True)
    embed.add_field(name="Members", value=len(ctx.message.server.members))
    embed.set_thumbnail(url=ctx.message.server.icon_url)
    await bot.say(embed=embed)

@bot.command(pass_context = True)
async def clear(ctx, number):
    await bot.say("Clearing... Message's will be cleared in about 4.2 seconds!!!")
    await asyncio.sleep(3)
    number = int(number) #Converting the amount of messages to delete to an integer
    counter = 0
    async for x in bot.logs_from(ctx.message.channel, limit = number):
        if counter < number:
            await bot.delete_message(x)
            counter += 1
            await asyncio.sleep(1.2) #1.2 second timer so the deleting process can be even

@bot.command(pass_context=True)
async def warn(ctx, user: discord.Member):
    embed = discord.Embed(title="{} has been warned".format(user.name), description="Here is the warn info.", color=0x00ff00)
    embed.add_field(name="Role", value=user.top_role, inline=True)
    embed.add_field(name="Name", value=user.name, inline=True)
    embed.add_field(name="ID", value=user.id, inline=True)
    embed.add_field(name="Joined", value=user.joined_at, inline=True)
    embed.add_field(name="Warned By", value=ctx.message.author    , inline=True)
    embed.set_thumbnail(url=user.avatar_url)
    await bot.say(embed=embed)

@bot.command(pass_context=True)
async def help(ctx):
    embed = discord.Embed(title="Help info", description="Here's what I could find.", color=0x00ff00)
    embed.add_field(name="Help", value="Show's this.", inline=True)
    embed.add_field(name="Clear", value="Clear's X amount of messages.", inline=True)
    embed.add_field(name="warn", value="Warn's the mentioned user.", inline=True)
    embed.add_field(name="Ban", value="Ban's the mentioned user from the server.", inline=True)
    embed.add_field(name="Kick", value="Kicks's the mentioned user.", inline=True)
    embed.add_field(name="serverinfo", value="Tell's you info about the server you're currently in.", inline=True)
    embed.add_field(name="info", value="Tell's info about the mentioned user", inline=True)
    embed.add_field(name="Owner", value="Tell's you who the owner and developer are.", inline=True)
    embed.add_field(name="mute", value="Mute's mentioned user.", inline=True)
    embed.add_field(name="unmute", value="Un-mute's the mentioned user.", inline=True)
    embed.add_field(name="addrole", value="Add's VIP role to mentioned user if it is created.", inline=True)
    embed.add_field(name="removerole", value="Remove's VIP role from mentioned user.", inline=True)
    embed.add_field(name="flipcoin", value="Flips a coin with Heads and Tails", inline=True)
    embed.add_field(name="hello", value="Say's hello back", inline=True)
    embed.add_field(name="ping", value="Ping's the bot and the bot says Pong!", inline=True)
    await bot.say(embed=embed)


bot.run("Put Your Bot Token Here Do Not Use One From YouTube")
